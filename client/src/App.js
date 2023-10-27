import './App.css'
import Title from './components/layout/Title'
import AddPeople from './components/forms/AddPeople'
import AddCar from './components/forms/AddCar'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
// import Contacts from './components/lists/Contacts'

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
        <AddPeople />
        {/* <Contacts /> */}
        <Divider>
          <h2>Add Car</h2>
        </Divider>
        <AddCar />
        <Divider>
          <h2>Records</h2>
        </Divider>
      </div>
    </ApolloProvider>
  )
}

export default App
