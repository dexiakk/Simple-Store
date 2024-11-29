import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import Link from "next/link"

interface props {
    question: string,
    content: string,
    link: string | null,
}

export default function FaqBlock({question, content, link}:props) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-[18px]">{question}</AccordionTrigger>
                <AccordionContent>
                    <span>{content}&nbsp;{link && (<Link href={link} className="font-semibold underline">here</Link>)}</span>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
