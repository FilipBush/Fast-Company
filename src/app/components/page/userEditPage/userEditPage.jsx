import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";

const UserEditPage = () => {
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const params = useParams();
    const { userId } = params;
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "",
        qualities: []
    });

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setData({
                name: data.name,
                email: data.email,
                profession: data.profession._id,
                sex: data.sex,
                qualities: data.qualities.map((qualitie) => {
                    return {
                        value: qualitie._id,
                        color: qualitie.color,
                        label: qualitie.name
                    };
                })
            });
        });
    }, []);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };

    const handleChange = (target) => {
        // console.log(target);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const updatedUser = {
            ...data,
            profession: getProfessionById(data.profession),
            qualities: data.qualities.map((qualitie) => {
                return {
                    _id: qualitie.value,
                    name: qualitie.label,
                    color: qualitie.color
                };
            })
        };
        // console.log("updatedUser:", updatedUser);
        api.users.update(userId, updatedUser);
    };

    if (data) {
        return (
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Имя"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                />
                <TextField
                    label="Электронная почта"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                />
                <SelectField
                    label="Выбери свою профессию"
                    defaultOption="Choose..."
                    options={professions}
                    name="profession"
                    value={data.profession}
                    onChange={handleChange}
                />
                <RadioField
                    options={[
                        { name: "Male", value: "male" },
                        { name: "Female", value: "female" },
                        { name: "Other", value: "other" }
                    ]}
                    value={data.sex}
                    name="sex"
                    label="Выберите ваш пол"
                    onChange={handleChange}
                />
                {data.qualities.length > 0 && (
                    <MultiSelectField
                        options={qualities}
                        onChange={handleChange}
                        defaultValue={data.qualities}
                        name="qualities"
                        label="Выберите ваши качества"
                    />
                )}
                <button
                    className="btn btn-primary w-100 mx-auto"
                    type="submit"
                    disabled={!isValid}
                >
                    Submit
                </button>
            </form>
        );
    } else {
        return <h3>loading ...</h3>;
    }
};

export default UserEditPage;
