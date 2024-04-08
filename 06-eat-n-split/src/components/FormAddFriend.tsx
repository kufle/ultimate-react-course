import { useState } from "react"
import Button from "./Button"

function FormAddFriend({ onAddFriend }: any) {
	const [name, setName] = useState("");
	const [image, setImage] = useState("https://i.pravatar.cc/48");

	function handleSubmit(e: any) {
		e.preventDefault();

		if(!name || !image) return;
		
		const id = crypto.randomUUID();
		const newFriend = {
			id,
			name,
			image: `${image}?=${id}`,
			balance: 0
		}

		onAddFriend(newFriend);
	
		setName("");
		setImage("https://i.pravatar.cc/48");
	}
	return (
		<form className="form-add-friend" onSubmit={handleSubmit}>
			<label>😀Friend Name</label>
			<input type="text" onChange={(e) => setName(e.target.value)} value={name} />

			<label>🔗Image Url</label>
			<input type="text" onChange={(e) => setImage(e.target.value)} value={image} />

			<Button>Add</Button>
		</form>
	)
}

export default FormAddFriend