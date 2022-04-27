import { ButtonGroup } from "@mui/material";
import { Form, Button, ToggleButton } from "react-bootstrap";
import { IPatient } from "../types";
import { useState } from "react";
import FileBase64 from "react-file-base64";

type AddFormProps = {
  setIsOpen: Function;
  patient: IPatient;
  updatePatient: Function;
};

const genders = [
  { name: "M", value: "1" },
  { name: "V", value: "2" },
  { name: "X", value: "3" },
];

export const EditForm = ({
  setIsOpen,
  patient,
  updatePatient,
}: AddFormProps) => {
  const [name, setName] = useState(patient.name);
  const [gender_Patient, setGender] = useState(patient.sex);
  const [birthdate, setBirthDate] = useState(patient.birth);
  const [extraText, setExtraText] = useState(patient.extraInfo);
  const [imageFile, setImageFile] = useState("");

  const onSubmit = () => {
    patient.name = name;
    patient.sex = gender_Patient;
    patient.birth = birthdate;
    patient.extraInfo = extraText;
    patient.picture = imageFile;
    const new_patient = patient;

    fetch("/api/update_patient", {
      method: "POST",
      body: JSON.stringify({ new_patient }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    updatePatient(patient);
  };

  const onClick = () => {
    onSubmit();
    setIsOpen(false);
  };

  const btnClicked = (name) => {
    setGender(name);
  };

  return (
    <div>
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Naam patiënt: </Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={patient.name}
              required
            />
          </Form.Group>
          <Form.Group>
            <div>
              <Form.Label>Kies geslacht patiënt: </Form.Label>
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
              placeholder={patient.birth}
              value={birthdate}
              onChange={(event) => setBirthDate(event.target.value)}
              required
              defaultValue={patient.birth}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Voeg extra informatie toe: </Form.Label>
            <Form.Control
              type="text"
              placeholder={patient.extraInfo}
              value={extraText}
              onChange={(event) => setExtraText(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="flex flex-col">
            <Form.Label>Voeg een profielfoto toe: </Form.Label>
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setImageFile(base64)}
            />
          </Form.Group>
          <Form.Group>
            <div className="relative space-x-4 pt-2">
              <Button className="btn btn-dark" onClick={() => onClick()}>
                Edit
              </Button>
              <div className="absolute right-0 top-2">
                <Button
                  className="btn btn-dark"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
