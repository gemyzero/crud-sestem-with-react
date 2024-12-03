
import { useEffect, useRef, useState } from 'react';
import './App.css'
import {collection , getDocs , addDoc ,setDoc , doc, deleteDoc} from 'firebase/firestore'
import {db} from './firebase'
import 'bootstrap/dist/css/bootstrap.css'


function App() {
  // state for edit product
  const [editProduct , seteditProduct ]  = useState(false);
  // product state 
  const [phone , setphone] = useState([])
  // value inputs form
  const nameVal = useRef();
  const priceVal = useRef();   
  const qtyVal = useRef();   
  // selectIndex for edit
  const [selectIndex , setselectIndex] = useState(0);

  // getData
   const getData = async ()=>{
    let final =[]
    const products =  await getDocs(collection(db, "products" ));
     
    products.forEach((phone) => {
      console.log(phone.id, " => ", phone.data());
      let opjphone = {... phone.data() , id: phone.id }
      final.push(opjphone)
    });
    setphone(final);

  }    
  useEffect(()=>{
    getData();
  },[])
  // addData
  const addData = async (newOpj)=>{
   await addDoc(collection(db, "products"),newOpj );
    getData();

  }
 
 
  // hadelSubmit
const  hadelSubmit = (event)=>{
event.preventDefault()
let newOpj = {
  name :nameVal.current.value,
  price :priceVal.current.value,
  qty :qtyVal.current.value
}
addData(newOpj)
nameVal.current.value=''
priceVal.current.value=''
qtyVal.current.value=''
  }

// setDate

  const setDate = async (newOpjEdit)=>{
  let doc_id = phone[selectIndex].id;
  console.log(doc_id)
  await setDoc(doc(db, "products", doc_id),newOpjEdit);
  getData();
  seteditProduct(false)
      nameVal.current.value=''
      priceVal.current.value=''
      qtyVal.current.value=''

}

  // handelEdit
 const  handelEdit =  (event)=>{
  event.preventDefault()
  let newOpjEdit = {
    name :nameVal.current.value,
    price :priceVal.current.value,
    qty :qtyVal.current.value
  }
console.log(newOpjEdit)
  setDate(newOpjEdit)
 }
  // openEdit

 const  openEdit =(index)=>{

  seteditProduct(!editProduct);
 
 nameVal.current.value = phone[index].name;
 priceVal.current.value =phone[index].price;
 qtyVal.current.value =phone[index].qty;
 setselectIndex(index)
  // let newOpjEdit = [...phone ,] ;
  // newOpjEdit.push()

 }
 // delet one product
 const delatData = async (doc_id)=>{
  event.preventDefault()
  await deleteDoc(doc(db, "products", doc_id));
  getData();


 }
 const handelDelate = async (index) =>{
  let doc_id = phone[index].id
  delatData(doc_id)
 }
  // delet all  product
  const delatAllData = async ()=>{
    event.preventDefault()
    await deleteDoc(doc(db, "products"));
    getData();
   }
   const handelDelateAll = async (index) =>{
    let doc_id = phone[index].id
    delatAllData()
   }
   
 
  return (
    <>
<form onSubmit={editProduct ? handelEdit : hadelSubmit}>
<input ref={priceVal} type="text" className="form-control my-2"  placeholder="enter your phone name"/>

<input ref={nameVal} type="text" className="form-control my-2"  placeholder="enter price"/>
<input ref={qtyVal} type="text" className="form-control my-2"  placeholder="enter qty"/>

<button  className={`btn btn-${editProduct ? 'warning' : 'primary'} m-2 w-100`}>{editProduct ? 'edit Product' : 'ADD New product'}</button>

</form>


    <table className='table table-dark '>
      <thead>
        <tr>
          <th>ID</th>
          <th>name</th>
          <th>price</th>
          <th>Qty</th>
          <th>Edit</th>
          <th>Delate</th>


        </tr>
      </thead>
      <tbody>
        {
          phone.map((el,index)=>{
            return(
          <tr key={index}>
          <th>{index}</th>
          <th>{el.name}</th>
          <th>{el.price}</th>
          <th>{el.qty}</th>
          <th><button  onClick={()=>{openEdit(index)}} disabled={editProduct ? true : false} className='btn btn-primary'>edit</button></th>
          <th><button  onClick={()=>{handelDelate(index)}}  className='btn btn-danger'>edit</button></th>


        </tr>
            )
          })
        }
      </tbody>
    </table>
    </>
  )
}

export default App
