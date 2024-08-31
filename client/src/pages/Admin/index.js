import { Tabs } from 'antd';
import MovieList from "./MovieList";
import TheatresTable from "./TheatresTable"


const tabItems = [
  {
    key: 'a',
    label: 'Movie',
    children: <div><MovieList /></div>
  },
  {
    key: 'b',
    label: 'Theatre',
    children: <div><TheatresTable /></div>
  }
];

function Admin() {

  return (
    <div>
      <h1>Admin Page</h1>
      <Tabs items={tabItems} />
    </div>
  )
}

export default Admin;