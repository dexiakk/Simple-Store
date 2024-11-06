import Image from "next/image"

export default function MobileFooter() {
    return (
        <footer className="flex md:hidden w-full flex-col items-center text-center text-black border-t-[2px] border-stone-200 mt-14 pt-4">
            <div className="w-[90%] flex justify-between gap-2">
                <div>
                    <span className="text-[20px] font-medium">Pomoc</span>
                    <ul>
                        <li>Uzyskaj pomoc</li>
                        <li>Status zamówienia</li>
                        <li>Wysyłka i dostawa</li>
                    </ul>
                </div>
                <div>
                    <span className="text-[20px] font-medium">Firma</span>
                    <ul>
                        <li>Informacje o Firmie</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div>
                    <span className="text-[20px] font-medium">Kontakt</span>
                    <ul>
                        <li>Adres</li>
                        <li>email@example.com</li>
                        <li>+48 000-000-00</li>
                    </ul>
                </div>

            </div>
            <Image src={"/img/blackLogo.png"} width={130} height={130} alt="logo" className="" />
        </footer>
    )
}