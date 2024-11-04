import React, { Fragment, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, IconButton, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { GroupService } from '../../../api/group.service';
import { IGroup } from '../../../types/group/group';
import LessonList from './LessonList';

interface GroupListProps {
  semesterId: number;
}

const GroupList: React.FC<GroupListProps> = ({ semesterId }) => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openGroups, setOpenGroups] = useState<number[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupData = await GroupService.getGroupsBySemesterId(semesterId);
        setGroups(groupData);
      } catch (error) {
        setError('Ошибка при получении данных о группах.');
        console.error('Ошибка:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [semesterId]);

  const handleToggleGroup = (groupId: number) => {
    setOpenGroups(prevOpenGroups =>
      prevOpenGroups.includes(groupId)
        ? prevOpenGroups.filter(id => id !== groupId)
        : [...prevOpenGroups, groupId]
    );
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box mt={2}>
      <List>
        {groups.map(group => (
          <Fragment key={group.id}>
            <ListItem onClick={() => handleToggleGroup(group.id)} sx={{ cursor: 'pointer' }}>
              <IconButton>
                {openGroups.includes(group.id) ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              <ListItemText primary={group.name} />
            </ListItem>
            <Collapse in={openGroups.includes(group.id)} timeout="auto" unmountOnExit>
              <LessonList
                lessons={group.lessons} groups={groups}
              />
            </Collapse>
          </Fragment>
        ))}
      </List>
    </Box>
  );
};

export default GroupList;
