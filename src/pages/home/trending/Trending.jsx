import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTab from '../../../components/switchTabs/SwitchTab'
import useFetch from '../../../hooks/useFetch'
import Carousel from '../../../components/carousel/Carousel'

function Trending() {
    const [ endPoint , setEndPoint  ] = useState("day")
    const { data ,loading } = useFetch(`/trending/all/${endPoint}`)

    const onTabChange = (tab) =>{
        setEndPoint(tab === "Day" ? "day" : "week")
    }

  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouseTitle">Trending</span>
            <SwitchTab data={['Day' ,'Week']} onTabChange={onTabChange} />
        </ContentWrapper>
        {
            data && <Carousel data={data?.results} loading={loading} />
        }
    </div>
  )
}

export default Trending