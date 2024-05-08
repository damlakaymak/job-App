import React, { useEffect, useState,useRef } from "react";
import { sortOpt, statusOpt, typeOpt } from "../utils/constants";
import Select from './Select';
import Button from './Button';
import api from "../utils/api";
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice";
import { useDispatch } from "react-redux";








const Filter = () =>{

  const [text,setText] = useState();
  const [debouncedText,setDebouncedText] = useState()
  const [sort,setSort] = useState();
  const [status,setStatus] = useState();
  const [type,setType] = useState();  

 const handleReset = () =>{
  setDebouncedText(),
  setText(),
  setType(),
  setStatus(),
  setSort();

  }
    
  
  const dispatch = useDispatch();

useEffect(()=>{

if(text === undefined) return;

const timer = setTimeout(()=>setDebouncedText(text),500)

return () => clearTimeout(timer)



},[text])


useEffect(()=>{

const sortP = sort === "a-z" || sort === "z-a" ? "company" :
sort === "En yeni"  || sort === "En eski" ? "date" :undefined;

const orderP =

sort === "a-z" || sort === "En eski" ? "asc" :
sort === "z-a" || sort  === "En yeni" ? "desc": undefined

const params ={

q:debouncedText,
status:status || undefined,
type: type || undefined,
_sort:sortP,
_order:orderP,

}




dispatch(setLoading());




api.get("/jobs",{params})
.then((res)=>dispatch(setJobs(res.data)))
.catch((err)=>dispatch(setError(err.message)))


}

,[debouncedText,status,sort,type])

  return (
    <div className="filter-sec">
      <h2>Filtreleme Formu</h2>

      <form onReset={handleReset}>
        <div>
          <label>Ara</label>
          <input onChange={(e)=> setText(e.target.value)} type="text"/>

        </div>
        <Select label="Durum" options={statusOpt} fn={(e)=>setStatus(e.target.value)}/>
        <Select label="Tür" options={typeOpt} fn={(e)=>setType(e.target.value)}/>
        <Select label="Sırala" options={sortOpt} fn={(e)=>setSort(e.target.value)}/>

        <Button type="reset"  text ="Filtreleri sıfırla"/>
      </form>
    </div>
  )
};

export default Filter;
