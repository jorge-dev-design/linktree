import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { db } from "../../services/firebaseConnection";
import { collection, doc, onSnapshot, orderBy, query, setDoc, deleteDoc } from "firebase/firestore";


interface LinkProps{
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin(){
    const [nameInput, setNameInput] = useState('');
    const [urlInput, setUrlInput] = useState('');
    const [textColorInput, setTextColorInput] = useState('#000000');
    const [backgroundColorInput, setBackgroundColorInput] = useState("#ffffff");
    const [links, setLinks] = useState<LinkProps[]>([]);

    useEffect(() => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("created", "asc"));

        const unsub = onSnapshot(queryRef, (snapshot) =>{
            let lista = [] as LinkProps[];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                });
            });
            setLinks(lista);
        })

        return () => {
            unsub();
        };
    },[]);

    async function handleRegister(e: FormEvent){
        e.preventDefault();

        const name = nameInput.trim();
        const url = urlInput.trim();

        if(name === '' || url === ''){
            alert('Preencha todos os campos!');
            return;
        }

        const linkRef = doc(collection(db, "links"));
        const newLink: LinkProps = {
            id: linkRef.id,
            name,
            url,
            bg: backgroundColorInput,
            color: textColorInput
        };

        // Mostra o link imediatamente enquanto o Firestore confirma a gravação.
        setLinks((currentLinks) => [...currentLinks, newLink]);
        setNameInput('');
        setUrlInput('');
        setTextColorInput('#000000');
        setBackgroundColorInput("#ffffff");

        try {
            await setDoc(linkRef, {
                name: newLink.name,
                url: newLink.url,
                bg: newLink.bg,
                color: newLink.color,
                created: new Date()
            });
        } catch (error) {
            // Desfaz a atualização visual se a gravação for rejeitada.
            setLinks((currentLinks) =>
                currentLinks.filter((link) => link.id !== newLink.id)
            );
            alert('Erro ao cadastrar o link!');
            console.error(error);
        }
    }

    async function handleDeleteLink(id: string){
        const docRef = doc(db, "links", id);
        await deleteDoc(docRef);
    }

    return(
        <div className="relative z-2 min-h-screen px-4 pb-10 sm:px-6">
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
                <Header/>

                <main className="mt-8 w-full max-w-xl">
                    <form onSubmit={handleRegister} className="flex w-full flex-col rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-sm sm:p-6">
                        <label htmlFor="link-name" className="mb-2 mt-2 font-medium text-white">
                            Nome do Link:
                        </label>
                        <Input
                            id="link-name"
                            placeholder="Digite o Nome do Link"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                        />

                        <label htmlFor="link-url" className="mb-2 mt-2 font-medium text-white">
                            URL do Link:
                        </label>
                        <Input
                            id="link-url"
                            type="url"
                            placeholder="Digite a URL do Link"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                        />

                        <section
                            className="my-5 grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
                            aria-label="Cores do link"
                        >
                            <label
                                htmlFor="background-color"
                                className="flex min-w-0 flex-col gap-2 rounded-xl border border-white/15 bg-black/10 p-3 text-white"
                            >
                                <span className="font-medium">Cor de fundo</span>
                                <span className="flex items-center gap-3">
                                    <input
                                        id="background-color"
                                        type="color"
                                        className="h-12 w-16 shrink-0 cursor-pointer rounded-lg border border-white/30 bg-transparent p-1"
                                        value={backgroundColorInput}
                                        onChange={(e) => setBackgroundColorInput(e.target.value)}
                                    />
                                    <span className="min-w-0 truncate font-mono text-sm uppercase text-white/80">
                                        {backgroundColorInput}
                                    </span>
                                </span>
                            </label>

                            <label
                                htmlFor="text-color"
                                className="flex min-w-0 flex-col gap-2 rounded-xl border border-white/15 bg-black/10 p-3 text-white"
                            >
                                <span className="font-medium">Cor do texto</span>
                                <span className="flex items-center gap-3">
                                    <input
                                        id="text-color"
                                        type="color"
                                        className="h-12 w-16 shrink-0 cursor-pointer rounded-lg border border-white/30 bg-transparent p-1"
                                        value={textColorInput}
                                        onChange={(e) => setTextColorInput(e.target.value)}
                                    />
                                    <span className="min-w-0 truncate font-mono text-sm uppercase text-white/80">
                                        {textColorInput}
                                    </span>
                                </span>
                            </label>
                        </section>

                        <div className="mb-7 flex w-full flex-col items-center rounded-md border border-gray-100/25 p-4">
                            <p className="mb-3 text-center font-medium text-white">
                                Veja como está ficando:
                            </p>

                            <article
                                className="my-2 w-11/12 max-w-xl cursor-pointer select-none rounded-lg py-2 text-center transition-transform hover:scale-105"
                                style={{ backgroundColor: backgroundColorInput }}
                            >
                                <p
                                    className="text-base md:text-lg"
                                    style={{ color: textColorInput }}
                                >
                                    {nameInput.trim() || 'Nome do link'}
                                </p>
                            </article>
                        </div>

                        <button type="submit" className="w-3/5 self-center cursor-pointer mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-1 flex justify-center items-center">
                            Cadastrar <FontAwesomeIcon icon={faLink} />
                        </button>
                    </form>

                    <section
                        className="mt-8 flex w-full flex-col items-center"
                        aria-labelledby="my-links-title"
                    >
                        <h2
                            id="my-links-title"
                            className="mb-4 text-center text-2xl font-bold text-white"
                        >
                            Meus Links
                        </h2>

                        {links.map((link) => (
                            <article key={link.id}
                                className="mb-2 flex w-full max-w-xl items-center justify-between rounded px-3 py-3"
                                style={{ backgroundColor: link.bg, color: link.color }}
                            >
                                <p>{link.name}</p>
                                <button onClick={ () => handleDeleteLink(link.id)} type="button" className="cursor-pointer" aria-label="Excluir link">
                                <FontAwesomeIcon
                                    className="text-xl text-white stroke-black [stroke-width:50] [paint-order:stroke_fill]"
                                    icon={faDeleteLeft}
                                />
                            </button>
                        </article>
                        ))}

                    </section>
                </main>
            </div>
        </div>
    )
}
