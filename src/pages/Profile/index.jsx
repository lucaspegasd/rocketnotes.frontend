import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { Container, Form, Avatar } from './styles';
import { Input } from '../../components/Inputs';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import  avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom'

export function Profile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [passwordOld, setPasswordOld] = useState()
  const [passwordNew, setPasswordNew] = useState()

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
  const [avatar, setAvatar] = useState(avatarURL);
  const [avatarFile, setAvatarFile] = useState(null);

  async function handleUpdate(){
    const updated ={
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    }

    const userUpdated = Object.assign(user, updated )

    await updateProfile({ user: userUpdated, avatarFile })
  }

  function handleChangeAvatar(event){
   const file = event.target.files[0];
   setAvatarFile(file);

   const imgPreview = URL.createObjectURL(file);
   setAvatar(imgPreview);
  }

  function handleBack(){
    navigate(-1)
  }

    return(
        <Container>
          <header>
             <button type="button" onClick={handleBack}>
                 <FiArrowLeft />
             </button>
          </header>

          <Form>
              <Avatar>
                <img 
                alt="Foto do usuário"
                src={avatar}
                />

                <label htmlFor="avatar">
                    <FiCamera />

                    <input 
                       id="avatar"
                       type="file"
                       onChange={handleChangeAvatar}
                    />
                </label>
              </Avatar>

               <Input 
                 placeholder="Nome"
                 type="text"
                 icon={FiUser}
                 value={name}
                 onChange={e => setName(e.target.value)}
                />

               <Input 
                 placeholder="E-mail"
                 type="text"
                 icon={FiMail}
                 value={email}
                 onChange={e => setEmail(e.target.value)}
                />

               <Input 
                 placeholder="Senha atual"
                 type="password"
                 icon={FiLock}
                 onChange={e => setPasswordOld(e.target.value)}
                />

               <Input 
                 placeholder="Nova Senha"
                 type="password"
                 icon={FiLock}
                 onChange={e => setPasswordNew(e.target.value)}
                />

                <Button title="Salvar" onClick={handleUpdate} />
          </Form>

        </Container>
    )
}