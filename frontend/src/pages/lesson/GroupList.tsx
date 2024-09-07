import React, { Fragment, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, IconButton, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { getGroupsBySemesterId } from '../../api/groupApi';
import { IGroup } from '../../types/group';
import TaskList from './TaskList';

interface GroupListProps {
  semesterId: number;
}

const GroupList: React.FC<GroupListProps> = ({ semesterId }) => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [openLessons, setOpenLessons] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupData = await getGroupsBySemesterId(semesterId);
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

  const handleToggleLesson = (lessonId: number) => {
    setOpenLessons(prevOpenLessons =>
      prevOpenLessons.includes(lessonId)
        ? prevOpenLessons.filter(id => id !== lessonId)
        : [...prevOpenLessons, lessonId]
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
            <ListItem>
              <ListItemText primary={group.name} />
            </ListItem>
            <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
              {group.lessons.map(lesson => (
                <Fragment key={lesson.id}>
                  <ListItem>
                    <ListItemText primary={lesson.name} />
                    <IconButton onClick={() => handleToggleLesson(lesson.id)}>
                      {openLessons.includes(lesson.id) ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </ListItem>
                  <Collapse in={openLessons.includes(lesson.id)} timeout="auto" unmountOnExit>
                    <TaskList lessonId={lesson.id} />
                  </Collapse>
                </Fragment>
              ))}
            </List>
          </Fragment>
        ))}
      </List>
    </Box>
  );
};

export default GroupList;
