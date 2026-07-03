import { MusicPlayer } from '../../components/music-player'
import profilePhoto from '../../assets/image/Foto_portifolio.jpeg'
import { Social } from '../../components/social'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faSquareLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { db } from '../../services/firebaseConnection'
import { getDocs, collection, orderBy, query, doc, getDoc} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Countdown } from '../../components/countdown'


interface LinksProps{
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps{
  instagram: string;
  github: string;
  linkedin: string;
}

export function Home() {
  const [links, setLinks] = useState<LinksProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

  useEffect(() => {
    function loadLinks(){
      const linksRef = collection(db, "links")
      const queryRef = query(linksRef, orderBy("created", "asc"))

      getDocs(queryRef)
      .then((snapshot) => {
        let lista = [] as LinksProps[];

        snapshot.forEach((doc) =>{
          lista.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color
          })
        })

        setLinks(lista);
      })
    }

    function loadSocialLinks(){
      const socialRef = doc(db, "social", "link")

      getDoc(socialRef)
      .then((snapshot) => {
        if(snapshot.exists()){
          setSocialLinks({
            instagram: snapshot.data().instagram ?? '',
            github: snapshot.data().github ?? '',
            linkedin: snapshot.data().linkedin ?? ''
          })
        }
      })
      .catch((error) => {
        console.error('Erro ao carregar as redes sociais:', error)
      })
    }

    loadLinks();
    loadSocialLinks();
  }, [])

  return (
    <main className="home-page">
      <section className="home-profile" aria-labelledby="profile-name">
        <img
          className="home-profile__photo"
          src={profilePhoto}
          alt="Foto"
        />
        <h1 id="profile-name">JORGE GABRIEL</h1>
        <span className='mb-1'>Meus Links:</span>


      <section className="flex w-11/12 max-w-xl flex-col gap-4 text-center">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full cursor-pointer select-none overflow-hidden rounded-lg py-2 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ backgroundColor: link.bg, color: link.color }}
          >
            <p className="text-base md:text-lg">
              {link.name}
            </p>
          </a>
        ))}
      </section>

      <footer className="flex justify-center gap-3 my-4">
        {socialLinks?.instagram && (
          <Social url={socialLinks.instagram}>
            <FontAwesomeIcon icon={faInstagram} size="2x" color="#fff"/>
          </Social>
        )}

        {socialLinks?.github && (
          <Social url={socialLinks.github}>
            <FontAwesomeIcon icon={faGithub} size="2x" color="#fff"/>
          </Social>
        )}

        {socialLinks?.linkedin && (
          <Social url={socialLinks.linkedin}>
            <FontAwesomeIcon icon={faSquareLinkedin} size="2x" color="#fff"/>
          </Social>
        )}
      </footer>

      <Countdown />

      </section>

      <MusicPlayer />
    </main>
  )
}
