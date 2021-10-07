/* eslint-disable camelcase */
/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  Amazon: undefined;
  Profile: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export interface IJob {
  basic_qualifications: String
  business_category: String
  city: String
  company_name: String
  country_code: String
  description: String
  department_cost_center: String
  description_short: String
  display_distance: null
  id: String
  id_icims: String
  job_category: String
  job_family: String
  job_function_id: null
  job_path: String
  job_schedule_type: String
  location: String
  normalized_location: String
  optional_search_labels: []
  posted_date: String
  preferred_qualifications: String
  primary_search_label: String
  source_system: String
  state: String
  title: String
  university_job: null
  updated_time: String
  url_next_step: String
  team: {
    label: String
    name?: String
  }
}
