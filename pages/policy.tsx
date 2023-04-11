import Layout from "../components/layout";
import { useState, useEffect } from 'react';
import axios from "axios";

interface Data {
  id: number;
  userId: number;
  balance: number;
  // Dodaj dowolne pozostałe pola z tabeli, zgodne z ich typem.
}

const supabaseUrl = "https://bhhnbnxtkcbzukjobjgk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoaG5ibnh0a2NienVram9iamdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExODE1NTQsImV4cCI6MTk5Njc1NzU1NH0.idRojanG5n3vgQ5SHfuoMgdP2mwXZwKQU7xH45bvKeU";
export default function Policy() {
  const [data, setData] = useState<Data[]>([]);

useEffect(() => {
  async function fetchData() {
    const response = await axios.get<Data[]>(
      'https://bhhnbnxtkcbzukjobjgk.supabase.co/rest/v1/userData',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJoaG5ibnh0a2NienVram9iamdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODExODE1NTQsImV4cCI6MTk5Njc1NzU1NH0.idRojanG5n3vgQ5SHfuoMgdP2mwXZwKQU7xH45bvKeU'}`,
        },
      }
    );
    setData(response.data);
    console.log(response.data);
  }
  fetchData();
}, []);
  return (
    <Layout>
      <div>
      {data.map((item) => (
        <div key={item.id}>{item.balance}</div>
      ))}
      XD
    </div>
    </Layout>
  );
}

