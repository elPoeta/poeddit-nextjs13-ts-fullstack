import CustomFeed from "@/components/Home/CustomFeed"
import GeneralFeed from "@/components/Home/GeneralFeed"
import HomeCard from "@/components/Home/HomeCard"
import { getAuthSession } from "@/lib/auth"


const Home = async () => {
  const session = await getAuthSession()
  return (
    <section>
      <h1 className='font-bold text-3xl md:text-4xl'>Your feed</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
        {session?.user ? <CustomFeed /> : <GeneralFeed />}
        <HomeCard />
      </div>
    </section>
  )
}

export default Home