import './App.css'
import Title from './components/layout/Title'
import UpsertPerson from './components/forms/UpsertPerson'
import UpsertCar from './components/forms/UpsertCar'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
// import Contacts from './components/lists/Contacts'

import RecordsSection from './components/sections/Record'

import { Divider } from "antd";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Title />
        <Divider />
        <Divider>
          <h2>Add Person</h2>
        </Divider>
        <UpsertPerson type={"Add"} />
        {/* <Contacts /> */}
        <Divider>
          <h2>Add Car</h2>
        </Divider>
        <UpsertCar type={"Add"} />
        {/* Records Section */}
        <Divider>
          <h2>Records</h2>
        </Divider>
        <RecordsSection />

      </div>
    </ApolloProvider>
  )
}

export default App
