import { FC, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getFirstReport } from '../../api/semesterYear.service';

const ReportPage: FC = () => {
    const [reportData, setReportData] = useState<any[]>([]);

    useEffect(() => {
        const fetchReportData = async () => {
            const data = await getFirstReport();
            setReportData(data);
        };
        fetchReportData();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Семестр</TableCell>
                        <TableCell>Специальность</TableCell>
                        <TableCell>Всего студентов</TableCell>
                        <TableCell>Заказало человек</TableCell>
                        <TableCell>В %</TableCell>
                        <TableCell>Из них все КР</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reportData.map((data, index) => (
                        <TableRow key={index}>
                            <TableCell>{data.semester}</TableCell>
                            <TableCell>{data.specialty}</TableCell>
                            <TableCell>{data.totalStudents}</TableCell>
                            <TableCell>{data.ordered}</TableCell>
                            <TableCell>{data.percent.toFixed(2)}%</TableCell>
                            <TableCell>{data.allKR}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ReportPage;
