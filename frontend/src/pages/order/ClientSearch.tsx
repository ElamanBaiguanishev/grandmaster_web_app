import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { FC } from 'react';
import { IClient } from '../../types/client/client';
import React from 'react';

interface ClientSearchProps {
    clients: IClient[];
    loading: boolean;
    searchQuery: string;
    onSearchChange: (value: string) => void;
    selectedClient: IClient | null;
    onClientChange: (client: IClient | null) => void;
}

const ClientSearch: FC<ClientSearchProps> = ({ clients, loading, searchQuery, onSearchChange, selectedClient, onClientChange }) => (
    <Autocomplete
        options={clients}
        getOptionLabel={(option: IClient) => `${option.cipher} ${option.name}`}
        value={selectedClient}
        onChange={(_, newValue) => onClientChange(newValue)}
        loading={loading}
        renderInput={(params) => (
            <TextField
                {...params}
                label="Поиск по ФИО"
                variant="outlined"
                size="medium"
                fullWidth
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                        <>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                            {params.InputProps.endAdornment}
                        </>
                    ),
                }}
            />
        )}
    />
);

export default React.memo(ClientSearch);
