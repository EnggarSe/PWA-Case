import React, { Component, Fragment  } from 'react'
import { Layout, Menu, Breadcrumb, Card, Image, Modal, Form, Input, Button, Checkbox, notification, Tag, Spin } from 'antd';
import Logo from '../../assets/trolley.svg';
import action from '../redux/dashboard/action'
import { connect } from 'react-redux'
import {UserAddOutlined, MailOutlined, KeyOutlined, PhoneOutlined, PlusOutlined} from '@ant-design/icons';


const {getItemList, addUserList, resetState, getUserList, addItemList, deleteItemList, editItemList} = action
const { Meta } = Card;
const { Header, Content, Footer } = Layout;

let check = localStorage.getItem('isLogin');
let Name = '';

class Dashboard extends Component{
   constructor (props) {
      super(props)
      this.state = {
         modalRegister : false,
         modalEdit : false,
         modalLogin : false,
         modalBarang : false,
         modalDelete : false,
         editable : false,
         username : '',
         password : '',
         email : '',
         phone : '',
         name : '',
         harga : '',
         jumlah : '',
         image : '',
         delete_id : '',
         edit_id : '',
      }
    }

    static getDerivedStateFromProps (nextProps, prevState) {
       console.log(nextProps, 'nextPrpss');
       
       
      if (nextProps !== prevState) {
         console.log(nextProps, 'NEXT');
         console.log(prevState, 'PREV');
         const {addUserLoader, itemsList, addUserMessage, userList, addItemMessage, addItemLoader, deleteItemMessage, deleteItemLoader, loader, editItemMessage, editItemLoader} = nextProps.listState
         return{
            itemList :  itemsList,
            addUserLoader : addUserLoader,
            addUserMessage : addUserMessage, 
            userList : userList,
            addItemMessage : addItemMessage,
            addItemLoader : addItemLoader,
            deleteItemMessage : deleteItemMessage,
            deleteItemLoader : deleteItemLoader,
            loader : loader,
            editItemLoader : editItemLoader,
            editItemMessage : editItemMessage
            
        }
       } return null
     }

   
    componentDidMount() {
      this.props.getItemList()
      this.props.getUserList()
   }

   componentDidUpdate (nextProps, prevState) {
      const {addUserMessage, addItemMessage, deleteItemMessage, editItemMessage} = this.state
      if(addUserMessage === "Created"){
         this.setState({
            modalRegister : false
         })
         notification['success']({
            message: 'Berhasil Membuat User Baru',
          });
         this.props.resetState()
         setTimeout(() => window.location.reload(), 1000)
      }

      if(addItemMessage === "Item Added"){
         this.setState({
            modalBarang : false
         })
         notification['success']({
            message: 'Berhasil Menambahkan Barang',
          });
         this.props.resetState()
         this.props.getItemList()
      }

      if(deleteItemMessage === "Item Deleted"){
         notification['success']({
            message: 'Berhasil Menghapus Barang',
          });
         this.setState({
            modalDelete : false,
         })
         this.props.resetState()
         this.props.getItemList()
      }

      if(editItemMessage === "Item Edited"){
         notification['success']({
            message: 'Berhasil Mengedit Barang',
          });
         this.setState({
            modalEdit : false,
         })
         this.props.resetState()
         setTimeout(() => window.location.reload(), 1000)
      }
   }

   registerModal = () => {
      this.setState({
         modalRegister : true,
      })
   }

   barangModal = () => {
      this.setState({
         modalBarang : true,
      })
   }

   registerCancel = () => {
      this.setState({
         modalRegister : false,
         modalLogin : false,
         modalBarang : false,
         modalDelete : false,
         editable : false,
         modalEdit : false,
      })
   }

   loginModal = () => {
      this.setState({
         modalLogin : true,
      })
   }

   handleChange = (key,value) => {
      this.setState({
         [key] : value
      })

   }

   logoutModal = () => {
      localStorage.setItem("isLogin", false)
      notification['success']({
         message: 'Selamat Tinggal'
      });
      
      setTimeout(() => window.location.reload(), 1000)
     
   }

   handleRegister = () => { 
      const {email, username, password, phone, userList} = this.state
      const cekUser = []
      const cekEmail = []
      userList.forEach(element => {
         cekUser.push(element.username)
         cekEmail.push(element.email)
      });
      console.log(cekUser, 'CEK');
      if(cekUser.includes(username) || cekEmail.includes(email)){
         alert("Username atau Email Sudah Terdaftar")
      } else {
         this.props.addUserList({
            email,
            username,
            password,
            phone
         })
      } 
   }

   handleLogin = () => {
      const {username, password, userList} = this.state
      console.log(username, 'USERNAME');
      console.log(userList, 'PASSWORD');
      var count = 0
      for(let i = 0 ; userList.length ; i++){
         count +=1;
         if(username === userList[i].username && password === userList[i].password){
            
            Name = username;
            let userCek = JSON.parse(localStorage.getItem('user'));
            if(userCek==null){
                localStorage.setItem("isLogin", true)
            }

            this.setState({
               modalLogin : false
            })
            notification['success']({
               message: 'Selamat Datang '+username,
             });
            setTimeout(() => window.location.reload(), 1000)
        } else if (count == userList.length){
            notification['error']({
               message: 'Username atau password tidak terdaftar',
            });
            // setTimeout(() => window.location.reload(), 1000)
            
        }
    }
   
   }

   deleteItem = () =>  {
      const {delete_id} = this.state
      this.props.deleteItemList(delete_id)  
   }

   modalDelete (id) {
      this.setState({
         modalDelete : true,
         delete_id : id ,
      })
   }

   handleEdit (list) {
      console.log(list, 'LIST');
      this.setState({
         editable : true,
         modalEdit : true,
         name : list.name,
         harga : list.harga,
         image : list.image,
         jumlah : list.jumlah,
         edit_id : list.id
      })
      
   }

   handleBarang = () => {
      const {name, jumlah, harga, image} = this.state
      this.props.addItemList({
         name,
         jumlah,
         harga,
         image,
      })
   }

   handleEditBarang = () => {
      const {name, jumlah, harga, image, edit_id} = this.state
      
      console.log(name, jumlah, harga, image, edit_id, 'DATA');
      this.props.editItemList({
         id : edit_id,
         name,
         jumlah,
         harga,
         image,
      })
      
      
   }

    render(){
       const {itemList, modalRegister, addUserLoader, modalLogin, modalBarang, addItemLoader, deleteItemLoader, modalDelete, loader, editable, name, harga, jumlah, image, modalEdit, editItemLoader} = this.state
       console.log(editable, 'ITEMMMMMM');
       return(
         <Layout>
         <div className = "Navigation-Bar">
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" >
               <img className = "Logo" src = {Logo} alt="logo"/>
            </div>
            <div className = "Center-Menu">
               <Menu theme="dark" mode="horizontal">
                  <p className = "title-header"> Your Item</p>
               </Menu>
            </div>
            <div className = "Left-Menu">
               {check !== 'true' ?
               <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                  <Menu.Item key="1" onClick = {this.loginModal}>Login</Menu.Item>
                  <Menu.Item key="2" onClick = {this.registerModal}>Register</Menu.Item>
               </Menu> 
               : 
               <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
                  <Menu.Item key="2" onClick = {this.barangModal}>Barang <PlusOutlined className = "add-icon"/></Menu.Item>
                  <Menu.Item key="1" onClick = {this.logoutModal}>Logout</Menu.Item>
               </Menu>}
               
            </div>
            </Header>   
         </div>
         <div className = "Body-Dashboard">
         <Spin spinning = {loader}>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
               
               {itemList!== "" && itemList.map((list, index) =>  {
                  return(
                     <Card
                     hoverable
                     style={{ width: 200 }}

                     >
                     <Tag className = "tag-jumlah" color="green">{list.jumlah}</Tag>
                     <Image alt="example" src={list.image} />
                     <Meta title={list.name}/>
                     <Tag className = "tag-harga" color="green">Rp {list.harga}</Tag>
                     {check==="true" &&
                        <div className = "button-card">
                           <Button type="primary" htmlType="submit" key = {index} className = "delete-button" onClick = {() => this.modalDelete(list.id)} >
                           Hapus
                           </Button>
                           <Button type="primary" htmlType="submit" onClick = {() => this.handleEdit(list)} >
                           Edit
                           </Button>
                        </div>}
                     </Card>
                  )
               })}
             
              
             
            </div>
            </Content>
            </Spin>    
         </div>
         <div className = "Footer-Dashboar">
            <Footer style={{ textAlign: 'center' }}>TestCase KlikDokter - Enggar Septrinas</Footer>   
         </div>



         <Modal
          title="Register"
          visible={modalRegister}
          onOk={this.handleOk}
          onCancel={this.registerCancel}
        >
            <Form onFinish={this.handleRegister} className="login-form">
               <Form.Item name = "username" rules={[{required : true}]}>
                     <Input
                     prefix={<UserAddOutlined/>}
                     placeholder="Username"
                     onChange = {(e) => this.handleChange('username', e.target.value)}
                     />
               </Form.Item>
               <Form.Item name = "email" rules={[{required : true}]}>
                     <Input
                     prefix={<MailOutlined/>}
                     placeholder="Email"
                     type = "email"
                     onChange = {(e) => this.handleChange('email', e.target.value)}
                     />
               </Form.Item>
               <Form.Item name = "phone" rules={[{required : true}]}>
                     <Input
                     prefix={<PhoneOutlined/>}
                     placeholder="Phone Number"
                     type = "number"
                     onChange = {(e) => this.handleChange('phone', e.target.value)}
                     />
               </Form.Item>
               <Form.Item name = "password" rules={[{required : true}]}>
                     <Input
                     prefix={<KeyOutlined/>}
                     placeholder="Password"
                     type = "password"
                     onChange = {(e) => this.handleChange('password', e.target.value)}
                     />
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button" loading = {addUserLoader}>
                     Register
                  </Button>
               </Form.Item>
            </Form>
        </Modal>

        <Modal
          title="Login"
          visible={modalLogin}
          onOk={this.handleOk}
          onCancel={this.registerCancel}
        >
            <Form onFinish={this.handleLogin} className="login-form">
               <Form.Item name = "username" rules={[{required : true}]}>
                     <Input
                     prefix={<UserAddOutlined/>}
                     placeholder="Username"
                     onChange = {(e) => this.handleChange('username', e.target.value)}
                     />
               </Form.Item>
               <Form.Item name = "password" rules={[{required : true}]}>
                     <Input
                     prefix={<KeyOutlined/>}
                     placeholder="Password"
                     type = "password"
                     onChange = {(e) => this.handleChange('password', e.target.value)}
                     />
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button" loading = {addUserLoader}>
                     Log in
                  </Button>
               </Form.Item>
            </Form>
        </Modal>

        <Modal
          title={"Tambah Barang"}
          visible={modalBarang}
          onOk={this.handleOk}
          onCancel={this.registerCancel}
        >
            <Form onFinish={this.handleBarang} className="login-form">
               <Form.Item name = "name" rules={[{required : true}]}>
                     <Input
                     placeholder="Nama Barang"
                     onChange = {(e) => this.handleChange('name', e.target.value)}
                     />
               </Form.Item>
               <Form.Item name = "image" rules={[{required : true}]}>
                     <Input
                     placeholder="Link Gambar"
                     onChange = {(e) => this.handleChange('image', e.target.value)}
                     />
               </Form.Item>
               <Form.Item name = "harga" rules={[{required : true}]}>
                     <Input
                     placeholder="Harga Barang"
                     type = "number"
                     onChange = {(e) => this.handleChange('harga', e.target.value)}
                     />
               </Form.Item>
               <Form.Item name = "quantity" rules={[{required : true}]}>
                     <Input
                     placeholder="Jumlah Barang"
                     type = "number"
                     onChange = {(e) => this.handleChange('jumlah', e.target.value)}
                     />
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button" loading = {addItemLoader}>
                     Tambah
                  </Button>
               </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={"Edit Barang"}
          visible={modalEdit}
          onOk={this.handleOk}
          onCancel={this.registerCancel}
        >
            <Form onFinish={this.handleEditBarang} className="login-form">
               <Form.Item name = "name" rules={[{required : false}]}>
                     <Input
                     placeholder="Nama Barang"
                     defaultValue = {name !== "" ? name : ""}
                     onChange = {(e) => this.handleChange('name', e.target.value)}
                     />
               </Form.Item>
               <Form.Item name = "image" rules={[{required : false}]}>
                     <Input
                     placeholder="Link Gambar"
                     defaultValue = {image !== "" ? image : ""}
                     onChange = {(e) => this.handleChange('image', e.target.value)}
                     />
               </Form.Item>
               <Form.Item name = "harga" rules={[{required : false}]}>
                     <Input
                     placeholder="Harga Barang"
                     defaultValue = {harga !== "" ? harga : ""}
                     type = "number"
                     onChange = {(e) => this.handleChange('harga', e.target.value)}
                     />
               </Form.Item>
               <Form.Item name = "quantity" rules={[{required : false}]}>
                     <Input
                     placeholder="Jumlah Barang"
                     type = "number"
                     defaultValue = {jumlah !== "" ? jumlah : ""}
                     onChange = {(e) => this.handleChange('jumlah', e.target.value)}
                     />
               </Form.Item>
               <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button" loading = {editItemLoader}>
                     Edit
                  </Button>
               </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Hapus Barang ?"
          visible={modalDelete}
          className = "modal-delete"
          onOk={this.handleOk}
          onCancel={this.registerCancel}
        >
           <div className = "footer-modal">
               <Button className = "delete-button" onClick = {this.deleteItem} loading = {deleteItemLoader}>
                  Hapus
               </Button>
           </div>
        </Modal>

       </Layout>
       )
    }
}



export default connect(
   state => ({
      listState : state.Dashboard
   }),
   {getItemList, addUserList, resetState, getUserList, addItemList, deleteItemList, editItemList}
)(Dashboard)