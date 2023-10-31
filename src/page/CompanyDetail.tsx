import {useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import Company from '../interface/companyInterface';

const CompanyDetail = () => {
  const {id} = useParams(); 
  const navigate = useNavigate();
  const [company , setCompany] = useState<Company | undefined>();
  const [loading, setLoading] = useState(true);

  const fetchCompany = () => {
    fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
        .then(result => result.json())
        .then(data => {
          setCompany(data);
          setLoading(false);
        })
  }

  useEffect(() => {
    fetchCompany();
  }, [])
  
  if (loading) {
    return (
      <div>
        <Header/>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <Header/>
      {company && 
      <ul >
        <li><strong>Name:</strong> {company.name}</li>
        <li><strong>Brewery type:</strong> {company.brewery_type}</li>
        <li><strong>Address: </strong> {company.address_1}</li>
        <li><strong>City:</strong> {company.city}</li>
        <li><strong>State province:</strong> {company.state_province}</li>
        <li><strong>Postal code:</strong> {company.postal_code}</li>
        <li><strong>Country:</strong> {company.country}</li>
        <li><strong>Longitude:</strong> {company.longitude}</li>
        <li><strong>Latitude:</strong> {company.latitude}</li>
        <li><strong>Phone:</strong> {company.phone}</li>
        <li><strong>Website url:</strong> <Link href={company.website_url}>{company.website_url}</Link></li>
        <li><strong>State:</strong> {company.state}</li>
        <li><strong>Street:</strong> {company.street}</li>
      </ul>
      }
      <Button variant="outlined" sx={{ m: 2 ,maxHeight: 500}} onClick={() => navigate(-1)}>Back</Button>
    </div>
  )
}

export default CompanyDetail