
import { useState } from 'react';

import { useNavigate } from 'react-router-dom'

import { Header } from '../../components/Head';
import { Input } from '../../components/Inputs';
import { Textarea } from '../../components/TextArea';
import { Section } from '../../components/Section';
import { NoteItem } from '../../components/NoteItems';
import { Button } from '../../components/Button';
import { ButtonText } from '../../components/ButtonText';

import { api } from '../../services/api'

import { Container, Form } from './styles';

export function New() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    const navigate = useNavigate();

    function handleAddLink(){
        setLinks(prevState => [...prevState, newLink])
        setNewLink("")
    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter(link => link !== deleted))
    }

    function handleAddTags(){
        setTags(prevState => [...prevState, newTag])
        setNewTag("")
    }

    function handleRemoveTags(deleted){
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    function handleBack(){
        navigate(-1)
    }

    async function handleNewNote(){
        if(!title){
            return alert("digite o título")
        }
        
                if(newLink) {
                    return alert("voçê escreveu um link, mas não adicionou. clique no botão para adicionar")
                }

        if(newTag) {
            return alert("voçê escreveu uma tag, mas não adicionou. clique no botão para adicionar")
        }

      await api.post("/notes", {
        title,
        description,
        tags,
        links
      })

      alert("Nota criada com sucesso!");
      navigate(-1);
    }

    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar Nota</h1>
                        <ButtonText title="Voltar" onClick={handleBack}/>
                    </header>

                    <Input 
                    placeholder="título" 
                    onChange={e => setTitle(e.target.value)} />
                    <Textarea 
                    placeholder="Observações"
                    onChange={e => setDescription(e.target.value)} 
                    />

                    <Section title="Links úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                 value={link}  
                                 key={String(index)}
                                 onClick={() => handleRemoveLink(link)  }
                                />
                            ))
                        }

                        <NoteItem 
                         value={newLink}  
                         isNew 
                         placeholder="Novo link"
                         onChange={e => setNewLink(e.target.value)}
                         onClick={handleAddLink}
                        />                        

                    </Section>

                    <Section title="Marcadores">
                        <div className="tags">
                            {
                               tags.map((tag, index) => (
                                   <NoteItem 
                                     key={String(index)}
                                     value={tag}
                                     onClick={() => {handleRemoveTags(tag)}}
                                   />
                               ))   
                            }

                          <NoteItem 
                          value={newTag} 
                          isNew 
                          placeholder="Nova tag" 
                          onChange={e => setNewTag(e.target.value)}
                          onClick={handleAddTags}
                          />
                       </div>
                    </Section>

                    <Button 
                    title="Salvar" 
                    onClick={handleNewNote} 
                    />

 
                </Form>
            </main>
        </Container>
    )
}