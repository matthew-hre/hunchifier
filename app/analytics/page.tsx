
'use server'
import AnalyticsClient from './AnalyticsClient';
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/Header'
import SEO from '@/components/SEO'
import AuthVerifier from '@/components/AuthVerifier'

export default async function AnalyticsServer(props: any) {

  const supabase = createClient()

  // select * from daily_rankings in the analytics schema

  const { data: hourlyData, error: hourlyError } = await supabase.from('hourly_rankings_12_hours').select('first_name, date, rank')

  const { data: dailyData, error: dailyError } = await supabase.from('daily_rankings').select('first_name, date, rank')


  return (
    <div className="flex flex-col items-center min-h-screen">
      <SEO
        pageTitle="Hunchifier"
        pageDescription="Born out of a hatred for Miro"
      />
      <AuthVerifier />
      <Header />
      <AnalyticsClient
        hourlyData={hourlyData}
        dailyData={dailyData}
      />
    </div>
  )
}



