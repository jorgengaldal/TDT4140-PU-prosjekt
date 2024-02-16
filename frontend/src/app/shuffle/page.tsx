import ScrollWindow from "@/components/ScrollWindow/ScrollWindow"
import "../../styles/globals.css"

export default function ShufflePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex justify-center">
                <p>
                    This is the shuffle page
                </p>
            </div>
            <ScrollWindow filterBy="title" filterValue="Jurassic Park"/>
            <p>Anbefalte filmer</p>
            <ScrollWindow />
        </main>
    )
}
