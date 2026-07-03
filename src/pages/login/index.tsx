import { useState } from 'react'
import { Input } from '../../components/input'
import { useNavigate } from 'react-router-dom'

import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

export function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        if(email === '' || password === '') {
            alert('Preencha todos os campos!');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate('/admin', {replace: true});
        })
        .catch((error) => {
            alert('Erro ao fazer login!');
            console.log(error);
        });
    }

    return(
        <div className="relative z-2 flex min-h-screen w-full h-screen items-center justify-center flex-col">
            <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Login</h1>
            
            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2">
                <Input placeholder="Digite seu Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <Input placeholder="Digite sua Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" className="h-9 bg-[#2d0856] rounded border-0 text-lg font-medium text-white cursor-pointer">
                    Entrar
                </button>
            </form>
        </div>
    )
}