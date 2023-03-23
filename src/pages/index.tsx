import { Inter } from "next/font/google";
import Image from 'next/image'
import { useState } from "react";
import { getHeroDetail } from "./api/getHeroDetail";
import { HeroT } from "@/types/Hero";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HeroT | undefined>();
  const handleSubmit = async () => {
    setLoading(true);
    try{
      const response = await getHeroDetail(text);
      setData(response);
    }catch(e){
      window.alert(e)
    }finally{
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px'}}>
      <label htmlFor="hero-name">Search</label>
      <input
        id="hero-name"
        placeholder="Type a hero name"
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
      {loading && <div className="py-5">loading</div>}
      {data && (
        <div >
          <img alt={`Avatar of ${data.name}`} src={data.avatar} />
          <div>
            <div >{data.name}</div>
            <div>{data.description}</div>
          </div>
        </div>
      )}
    </div>
  );
}
