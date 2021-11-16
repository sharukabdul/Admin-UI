import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Edit from "./components/Edit";
import Home from "./components/Home";

function App() {
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').then(res => {
      setData(res.data);
    });
  },[]);

  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleDelete = (index) => {
    if(window.confirm('Are you sure you want to delete?')) {
      setData([...data.slice(0, index), ...data.slice(index+1)]);
    }
  }

  const handleDeleteAll = (index) => {
    window.confirm('Are you sure you want to delete all?')
    setData(data.filter(item => {
      return item.index != index;
    }));
  }

  const editHandler = (id, obj) => {
    const result = data.map(item => {
      if(item.id == obj.id) {
        return obj;
      }
      return item;
    });
    setData(result);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render= {() => <Home data= {data} currentItems= {currentItems} currentPage={currentPage} itemsPerPage= {itemsPerPage} totalItems= {data.length} pageSelected= {pageSelected} handleDelete= {handleDelete} handleDeleteAll= {handleDeleteAll} />} />
          <Route path= "/edit/:id" render= {(props) => <Edit {...props} data= {data} editHandler= {editHandler} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
