import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { useState, useEffect } from "react";
import { db } from "../../services/firebaseConnection";
import { doc, setDoc, getDoc } from 'firebase/firestore'

export function Networks(){
    const [instagram, setInstagram] = useState('');
    const [github, setGithub] = useState('');
    const [linkedin, setLinkedin] = useState('');

    useEffect(() => {
        function loadLinks(){
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot) =>{
               if(snapshot.data() !== undefined){
                setInstagram(snapshot.data()?.instagram)
                setGithub(snapshot.data()?.github)
                setLinkedin(snapshot.data()?.linkedin)
               }
            })
        }

        loadLinks();
    }, [])

    function handleRegister(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            instagram : instagram,
            github: github,
            linkedin: linkedin
        })
        .then(() => {
            console.log("Cadastrado com sucesso")
        })
        .catch((error) =>{
            alert("Erro ao Salvar os Links")
            console.log("Error ao salvar" + error)
        })
    }

    return(
        <div className="relative z-[2] min-h-screen px-4 pb-10 sm:px-6">
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
                <Header/>

                <main className="mt-8 w-full max-w-xl">
                    <section className="flex w-full flex-col rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-sm sm:p-6">
                        <h1 className="mb-6 text-center text-2xl font-medium text-white">
                            Minhas redes sociais
                        </h1>

                        <form className="flex w-full flex-col" onSubmit={handleRegister}>
                            <label htmlFor="instagram-url" className="mb-2 mt-2 font-medium text-white">
                                Link do Instagram
                            </label>
                            <Input
                                id="instagram-url"
                                type="url"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                                placeholder="Digite a URL do Instagram"
                            />

                            <label htmlFor="github-url" className="mb-2 mt-2 font-medium text-white">
                                Link do GitHub
                            </label>
                            <Input
                                id="github-url"
                                type="url"
                                value={github}
                                onChange={(e) => setGithub(e.target.value)}
                                placeholder="Digite a URL do GitHub"
                            />

                            <label htmlFor="linkedin-url" className="mb-2 mt-2 font-medium text-white">
                                Link do LinkedIn
                            </label>
                            <Input
                                id="linkedin-url"
                                type="url"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                                placeholder="Digite a URL do LinkedIn"
                            />

                            <button
                                type="submit"
                                className="relative z-2 mb-3 mt-4 flex h-9 w-3/5 cursor-pointer items-center justify-center self-center rounded bg-blue-600 font-medium text-white shadow-md transition-all duration-150 hover:bg-blue-700 active:scale-95 active:bg-blue-800 active:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Salvar Links
                            </button>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    )
}
