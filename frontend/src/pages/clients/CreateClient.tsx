import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from "@mui/material";
import { ISemesterByYear } from "../../types/semester/semesterByYear";
import { ClientService } from "../../api/client.service";
import { IClientPayloadData } from "../../types/client/client.payload";
import { SemesterByYearService } from "../../api/semesterYear.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateClient: React.FC = () => {
    const [clientData, setClientData] = useState<IClientPayloadData>({
        cipher: "",
        name: "",
        groupName: "",
        semesterId: 0,
        phoneNumber: "",
        login: "",
        password: "",
    });

    const [semesters, setSemesters] = useState<ISemesterByYear[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const semestersData = await SemesterByYearService.getYearSemesters();
                setSemesters(semestersData);
            } catch (error) {
                console.error("Error fetching semesters:", error);
                toast.error("Ошибка при загрузке семестров");
            }
        };

        fetchSemesters();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClientData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSemesterChange = (e: SelectChangeEvent<string>) => {
        setClientData((prev) => ({
            ...prev,
            semesterId: parseInt(e.target.value, 10),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await ClientService.createClient(clientData);
            toast.success("Клиент успешно создан");
        } catch (error) {
            toast.error(`Ошибка при создании клиента ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Шифр"
                name="cipher"
                value={clientData.cipher}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="ФИО"
                name="name"
                value={clientData.name}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Группа"
                name="groupName"
                value={clientData.groupName}
                onChange={handleInputChange}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                label="Телефон"
                name="phoneNumber"
                value={clientData.phoneNumber}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Логин"
                name="login"
                autoComplete="username"
                value={clientData.login}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Пароль"
                name="password"
                type="password"
                autoComplete="new-password"
                value={clientData.password}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Семестр</InputLabel>
                <Select
                    value={clientData.semesterId.toString()}
                    onChange={handleSemesterChange}
                    label="Семестр"
                    required
                >
                    {semesters.map((semester) => (
                        <MenuItem key={semester.id} value={semester.id.toString()}>
                            {semester.name} ({semester.year.name})
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
            >
                {loading ? "Создание..." : "Создать клиента"}
            </Button>
        </form>
    );
};

export default CreateClient;
