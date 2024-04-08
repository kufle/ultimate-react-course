import { useState } from "react"
import Button from "./Button"

function FormSplitBill({ selectedFriend, onSplitBill }: any) {
    const [bill, setBill] = useState<any>("");
    const [paidByUser, setPaidByUser] = useState<any>("");
    const paidByFriend = bill ? bill - paidByUser : '';
    const [whoIsPaying, setWhoIsPaying] = useState<string>("user");

    function handleSubmit(e: any) {
        e.preventDefault();

        if(!bill || !paidByUser) return;
        
        onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
    }

    return (
        <form className='form-split-bill' onSubmit={handleSubmit}>
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label>😀Bill Value</label>
			<input type="text" value={bill} onChange={e => setBill(Number(e.target.value))} />

            <label>😃Your Expense</label>
			<input type="text" 
                value={paidByUser} 
                onChange={e => setPaidByUser(
                    Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
                )}
            />
            
            <label>😁{selectedFriend.name}'s expense</label>
			<input type="text" disabled value={paidByFriend} />

            <label>🙄Who is paying the bill</label>
            <select value={whoIsPaying} onChange={e => setWhoIsPaying(e.target.value)}>
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>Split Bill</Button>
        </form>
    )
}

export default FormSplitBill
