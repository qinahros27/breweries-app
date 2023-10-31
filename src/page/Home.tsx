import React, { useEffect } from 'react';
import {useState} from 'react';

import Header from './Header';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PageCompany from './PageCompany';

const Home = () => {
  const [type,setType] = useState('');
  const [name,setName] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value as string);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const fetchDefault = () => {
    fetch(`https://api.openbrewerydb.org/v1/breweries`)
    .then(
        result => result.json()
    ).then(
        data => {
            setCompanies(data);
            setLoading(false);
        }
    )
  }

  useEffect(() => {
    fetchDefault();
  }, [])

  const fetchSort = () => {
    let name_item = name;
    name_item = name_item.toLocaleLowerCase();
    const type_name:string[] = ["micro", "nano","regional", "brewpub","large", "planning" ,"bar", "contract","proprietor","closed"];
    if(name.includes(" ")) {
      name_item = name_item.replace(" ", "_");
    }
    else {
      name_item = name_item.toLocaleLowerCase();
    }
    if(type === '' || type === '0' || name_item==='' || (type === 'by_type' && (!type_name.includes(name_item.toLocaleLowerCase())))) {
      if (type === 'by_type' && (!type_name.includes(name_item.toLocaleLowerCase()))) {
        alert('The name of the type does not exist.')
      } 
      fetch(`https://api.openbrewerydb.org/v1/breweries`)
        .then(
            result => result.json()
        ).then(
            data => {
                setCompanies(data);
                setLoading(false)
            }
        )
    }
    else {
    fetch(`https://api.openbrewerydb.org/v1/breweries?${type}=${name_item}`)
        .then(
            result => result.json()
        ).then(
            data => {
                setCompanies(data);
                setLoading(false);
                setPage(0);
                setRowsPerPage(10);
            }
        ) 
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }
   
  return (
    <div>
      <Header/> 

      <FormControl sx={{ m: 3, minWidth: 200}}>
        <InputLabel >Item</InputLabel>
        <Select
          value={type}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="0">Select</MenuItem>
          <MenuItem value="by_city">City</MenuItem>
          <MenuItem value="by_name">Name</MenuItem>
          <MenuItem value="by_state">State</MenuItem>
          <MenuItem value="by_postal">Postal</MenuItem>
          <MenuItem value="by_type">Type</MenuItem>
        </Select>
      </FormControl>

      <TextField id="filled-basic" label="Enter name of item" variant="filled" value={name} onChange={inputChange} sx={{ m: 3, minWidth: 250}}/>
      <Button variant="outlined" sx={{ m:3,minHeight: '55px',minWidth: '100px'}}  onClick={() => fetchSort()}>Search</Button>

      <PageCompany 
        companies={companies}
        page= {page}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  )
}

export default Home