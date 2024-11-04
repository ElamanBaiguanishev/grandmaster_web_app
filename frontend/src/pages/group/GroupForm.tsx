import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { IGroup } from '../../types/group/group';
import { ISemester } from '../../types/semester/semester';
import { GroupService } from '../../api/group.service';
import { IGroupPayloadData } from '../../types/group/group.payload';
import { SemesterService } from '../../api/semester.service';

interface GroupFormProps {
  group?: IGroup | null;
  onClose: () => void;
}

const GroupForm: React.FC<GroupFormProps> = ({ group, onClose }) => {
  const [name, setName] = useState(group?.name || '');
  const [semesterId, setSemesterId] = useState<number | ''>(group?.semester?.id || '');
  const [semesters, setSemesters] = useState<ISemester[]>([]);

  const isEditMode = Boolean(group?.id);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const data = await SemesterService.getSemesters();
        setSemesters(data);
      } catch (error) {
        console.error('Error fetching semesters:', error);
      }
    };

    fetchSemesters();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (semesterId === '') {
      console.error('Semester is required');
      return;
    }

    const groupData: IGroupPayloadData = {
      name,
      semesterId
    };

    try {
      if (isEditMode) {
        await GroupService.updateGroup(group!.id, groupData);
      } else {
        await GroupService.createGroup(groupData);
      }
      onClose(); // Закрываем форму после успешного сохранения
    } catch (error) {
      console.error('Error saving group:', error);
    }
  };

  return (
    <Paper sx={{ padding: 1 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Название группы"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Семестр</InputLabel>
          <Select
            value={semesterId}
            onChange={(e) => setSemesterId(e.target.value as number)}
            label="Семестр"
          >
            {semesters.map((semester) => (
              <MenuItem key={semester.id} value={semester.id}>
                {semester.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" type="submit" sx={{ marginRight: 1 }}>
          {isEditMode ? 'Обновить' : 'Создать'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Отмена
        </Button>
      </form>
    </Paper>
  );
};

export default GroupForm;
