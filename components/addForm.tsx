import { ButtonGroup, Input } from "@mui/material";
import { type } from "os";
import { useState } from "react";
import { Form, Button, ToggleButton } from "react-bootstrap"
import { IPatient } from "../types";
import { v4 as uuidv4 } from "uuid";

type AddFormProps = {
    setIsOpen: Function;
    newPatient: Function
}

const genders = [
    { name: 'M', value: '1' },
    { name: 'V', value: '2' },
    { name: 'X', value: '3' },
];

export const AddForm = ({ setIsOpen, newPatient }: AddFormProps) => {
    const [name, setName] = useState("");
    const [gender_Patient, setGender] = useState("");
    const [birthdate, setBirthDate] = useState("");
    const [extraText, setExtraText] = useState("");
    const [imageFile, setImageFile] = useState("");

    console.log(imageFile)
    const onSubmit = () => {
        const new_patient: IPatient = {
            _id: uuidv4(),
            name: name,
            user_id: "",
            sex: gender_Patient,
            birth: birthdate,
            extraInfo: extraText,
            file_ids: [],
            new: false,
        };
        newPatient(new_patient);
    }

    const onClick = () => {
        onSubmit()
        setIsOpen(false)
    }

    const btnClicked = (name) => {
        setGender(name)
    }

    return (
        <div>
            <div>
                <Form>
                    <Form.Group>
                        <Form.Label>Naam patiënt:</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Naam "
                            required />
                    </Form.Group>
                    <Form.Group>
                        <div>
                            <Form.Label>Kies geslacht patiënt:</Form.Label>
                        </div>
                        <ButtonGroup className="justify-center space-x-2">
                            {genders.map((gender, idx) => (
                                <ToggleButton
                                    onClick={() => btnClicked(gender.name)}
                                    key={idx}
                                    id={`gender-${idx}`}
                                    value={gender_Patient}
                                    variant="secondary"
                                >
                                    {gender.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Kies geboortedatum patiënt: </Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="Geboorte datum"
                            value={birthdate}
                            onChange={(event) => setBirthDate(event.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Voeg extra informatie toe: </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="extra informatie"
                            value={extraText}
                            onChange={(event) => setExtraText(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Voeg een profielfoto toe: </Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="profielfoto"
                            value={imageFile}
                            onChange={(event) => setImageFile(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <div className="relative space-x-4 pt-2">
                            <Button className="btn btn-dark" onClick={onClick}>
                                Add
                            </Button>
                            <div className="absolute right-0 top-2">
                                <Button className="btn btn-dark" onClick={() => setIsOpen(false)}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

