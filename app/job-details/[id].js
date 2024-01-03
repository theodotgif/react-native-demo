import {Text, View,SafeAreaView, ScrollView, ActivityIndicator, RefreshControl} from 'react-native'
import { Stack, useRouter, useGlobalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'

import {Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from '../../components'
import {COLORS, icons, SIZES} from '../../constants'
import useFetch from '../../hooks/useFetch'

const tabs = ['About', 'Qualifications', 'Responsibilities']

const JobDetails = () => {
    const {id} = useGlobalSearchParams()
    const router = useRouter()
    const [refreshing, setRefreshing] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs[0])

    const { data, isLoading, error, refetch } = useFetch('job-details', {job_id: id})
    const job = data[0]

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, [])

    const displayTabContent = () => {
        switch (activeTab) {
            case 'About':
                return <JobAbout info={job.job_description ?? 'No data provided.'} />
            case 'Qualifications':
                return <Specifics title='Qualifications' points={job.job_highlights?.Qualifications ?? ['N/A']} job={job} />
            case 'Responsibilities':
                return <Specifics title='Responsibilities' points={job.job_highlights?.Responsibilities ?? ['N/A']} job={job} />
            default:
                return <JobAbout job={job} />
        }
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
            options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension='60%'
                        handlePress={() => router.back()}
                    />
                ),
                headerRight: () => (
                    <ScreenHeaderBtn
                        iconUrl={icons.share}
                        dimension='60%'
                        share={job?.job_google_link ?? 'https://careers.google.com/jobs/results'}
                    />
                ),
                headerTitle:''
            }} />
        <>
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                {isLoading ? <ActivityIndicator size='large' color={COLORS.primary} /> : data.length === 0 ? (<Text> No data</Text>) : (
                    <>
                        <Company
                            companyLogo={job.employer_logo}
                            jobTitle={job.job_title}
                            companyName={job.employer_name}
                            location={job.location}
                        />
                        <JobTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
                        {displayTabContent()}

                    </>
                )}
            </ScrollView>
            <JobFooter url={job?.job_google_link ?? 'https://careers.google.com/jobs/results'} />
        </>
    </SafeAreaView>
  )
}

export default JobDetails