import './App.css'
import { useEffect } from 'react';
import { fetchDataFromApi } from './utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { Routes , Route } from 'react-router-dom'

import Header from './components/header/Header'
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';

function App() {

  const dispatch = useDispatch()
  const { url } = useSelector(state => state.home)

  useEffect(()=>{
    fetchApiConfig()
    genersCall()
  },[])

  const fetchApiConfig = async () =>{
    const res = await fetchDataFromApi('/configuration')
    const url = {
        backdrop : res.images.secure_base_url + "original",
        poster : res.images.secure_base_url + "original",
        profile : res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url))
  }

  // const genersCall = async () =>{
  //     const resTv = await fetchDataFromApi("/genre/tv/list")
  //     const resMv = await fetchDataFromApi("/genre/movie/list")
  //     const genres = { ...resTv.genres, ...resMv.genres}
  //     dispatch(getGenres(genres))
  // } 

  const genersCall = async () =>{
    let promises = []
    let endPoints = ["tv","movie"]
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises)
    data.map(({ genres })=>{
      return genres.map((item)=>(allGenres[item.id]=item));
    })
    dispatch(getGenres(allGenres))
  }


  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
