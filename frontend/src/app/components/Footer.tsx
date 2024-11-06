import Image from "next/image"

export default function Footer() {
    return (
        <footer className="hidden md:flex w-full justify-center text-black border-t-[2px] border-stone-200 mt-14 pt-4">
                <div className="max-w-[800px] w-[80%] flex justify-between gap-8 2xl:gap-18">
                    <div>
                        <span className="text-[18px] font-medium">Pomoc</span>
                        <ul>
                            <li>Uzyskaj pomoc</li>
                            <li>Status zamówienia</li>
                            <li>Wysyłka i dostawa</li>
                        </ul>
                    </div>
                    <div>
                        <span className="text-[18px] font-medium">Firma</span>
                        <ul>
                            <li>Informacje o Firmie</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div>
                        <span className="text-[18px] font-medium">Kontakt</span>
                        <ul>
                            <li>Adres</li>
                            <li>email@example.com</li>
                            <li>+48 000-000-00</li>
                        </ul>
                    </div>
                    <Image src={"/img/blackLogo.png"} width={100} height={100} alt="logo" className="" />
                </div>
        </footer>
    )
}