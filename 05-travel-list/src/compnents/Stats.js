export default function Stats({items}) {
    // if no items are in the list yet, calculation does not need to be performed, and
    // we can return different message into the footer
    if(!items.length) return (
        <p className="stats">
            <em>Start packing yourself!</em>
        </p>
    )

    const itemsCount = items.length
    const packedItems = items.filter((items) => items.packed).length
    const percentagePacked = Math.round((packedItems / itemsCount) * 100)

    return (
        <footer className="stats">
            <em>
                {
                    percentagePacked === 100 ?
                        `You got all ${itemsCount} stuff packed so you are ready to go!` :
                        `You have ${itemsCount} items on your list, and you already 
                        packed ${packedItems} (${percentagePacked}%)`
                }
            </em>
      </footer>
    )
}
