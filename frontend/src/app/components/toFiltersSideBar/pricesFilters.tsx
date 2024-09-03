export default function PricesFilters() {
    return (
        <div className={"flex flex-col gap-1 pt-3"}>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Poniżej 229 zł</label>
            </div>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">229 zł - 399 zł</label>
            </div>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">399 zł - 599 zł</label>
            </div>
            <div className="flex">
                <input type="checkbox" /><label className="pl-2">Powyżej 599 zł</label>
            </div>
        </div>
    )
}