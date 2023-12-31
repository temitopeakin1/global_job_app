import React from 'react'
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
import { useFetch } from '../../hook/useFetch'

import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components'
import { COLORS, icons, SIZES } from '../../constants'

const tabs = ['About', 'Qualifications', 'Responsibilities']

const JobDetails = () => {
  // use to get the ID of the job details page we are on
  const params = useSearchParams()
  const router = useRouter()

  const [data, isLoading, error, refresh] = useFetch('job-details', {
    job_id: params.id,
  })

  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState(tabs[0])
  const onRefresh = () => {}

  const displayTabContent = () => {
    switch (activeTab) {
      case 'Qualifications':
        return (
          <Specifics
            title="Qualifications"
            points={data[0].job_highlights?.Qualifications ?? ['Not Available']}
          />
        )

      case 'About':
        return <JobAbout info={data[0].job_description ?? 'No Info found'} />
      case 'Responsibilities':
      default:
        break
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension="60%"
              // handlePress={() => router.back()}
            />
          ),
          headerTitle: '',
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.secondary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.length === 0 ? (
            <Text>Data not found</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                Location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  )
}

export default JobDetails
