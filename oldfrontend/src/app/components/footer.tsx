import Image from "next/image"

export default function Footer() {
    return (
        <footer className="flex justify-center text-black border-t-[2px] border-stone-200 mt-14">
            <div className="w-[65%] flex justify-between items-center">
                <div className="flex gap-24">
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
                </div>
                <div>
                    <Image src={"/img/blackLogo.png"} width={150} height={150} alt="logo" />
                </div>
            </div>
        </footer>
    )
}