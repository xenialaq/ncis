import * as React from 'react';
import {
  StyleSheet, Alert, Modal,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import MultiSelect from 'react-native-multiple-select';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from '../components/Themed';
import { IJob, RootTabScreenProps } from '../types';

import getJobs from '../actions/getJobs';
import getTeam from '../actions/getTeam';

const styles = StyleSheet.create({
  lightText: {
    color: '#000',
  },
  list: {
    flex: 1,
  },
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalView: {
    height: 50,
    width: 100,
    position: 'absolute',
    padding: 10,
    lineHeight: 30,
    textAlign: 'center',
    left: '50%',
    top: '50%',
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: -50,
    marginTop: -25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default function AmazonScreen({ navigation }: RootTabScreenProps<'Amazon'>) {
  const [loading, setLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState();
  const [data, setData] = React.useState<IJob[]>([]);
  const FlatListItemSeparator = () => (
    <View style={{
      height: 0.5,
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
    }}
    />
  );

  const renderItem = ({ item: d }: { item: IJob }) => (
    <TouchableOpacity style={styles.list}>
      <Text style={styles.lightText}>{d.title}</Text>
      <Text style={styles.lightText}>{d.location}</Text>
      <Text style={styles.lightText}>{d.team.name || d.team.label}</Text>
    </TouchableOpacity>
  );
  const cities = [{
    id: 'atu',
    name: 'Austin, Texas, USA',
  }, {
    id: 'bwu',
    name: 'Bellevue, Washington, USA',
  }, {
    id: 'swu',
    name: 'Seattle, Washington, USA',
  }, {
    id: 'sfcu',
    name: 'San Francisco, California, USA',
  }, {
    id: 'epacu',
    name: 'East Palo Alto, California, USA',
  }, {
    id: 'scu',
    name: 'Sunnyvale, California, USA',
  }];

  const [citiesSelected, setCitiesSelected] = React.useState<any[]>([]);
  const [citiesSelectedTmp, setCitiesSelectedTmp] = React.useState<any[]>([]);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent
        visible={loading}
      >
        <View style={styles.modalView}>
          <Text>Loading...</Text>
        </View>
      </Modal>
      <View style={{ width: '100%' }}>
        <MultiSelect
          hideTags
          single={false}
          items={cities}
          uniqueKey="name"
          onSelectedItemsChange={(items) => {
            setCitiesSelectedTmp(items);
          }}
          onSubmit={async () => {
            const orig = citiesSelected.sort();
            const changed = citiesSelectedTmp.sort();
            if (orig.join(',') === changed.join(',')) {
              return;
            }
            setCitiesSelected(citiesSelectedTmp);
            let jobs: IJob[] = [];
            let teamNames: String[] = [];
            try {
              setLoading(true);
              jobs = await getJobs({ locations: citiesSelectedTmp });
              teamNames = await Promise.all(
                jobs.map(({ job_path: jobPath }) => getTeam({ jobPath })),
              );
              setData(
                jobs.map((j, i) => ({
                  ...j,
                  team: {
                    ...j.team,
                    name: teamNames[i],
                  },
                })),
              );
              setLoading(false);
            } catch (error) {
              setLoading(false);
              setErrorText(error.message);
              setTimeout(() => {
                setErrorText(undefined);
              }, 5e3);
            }
          }}
          selectedItems={citiesSelectedTmp}
          selectText="Select Cities"
          searchInputPlaceholderText="Search Items..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#df9a57"
          selectedItemIconColor="#df9a57"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#df9a57"
          submitButtonText="Submit"
        />
      </View>
      <FlatList
        data={data}
        ItemSeparatorComponent={FlatListItemSeparator}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(item) => item.id.toString()}
      />
      { errorText
        && (
        <Snackbar
          visible
          onDismiss={() => {}}
        >
          {errorText}
        </Snackbar>
        )}
    </View>
  );
}
