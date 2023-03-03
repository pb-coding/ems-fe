import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import api from '../../../services/api';

function QueryExample() {

    const { data, status } = useQuery(['catfact'], api.fetchCatfact);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'error') {
        return <div>Error fetching data</div>;
    }

    return (
        <ul>
            <p>{data.fact}</p>
        </ul>
    )
}
export default QueryExample;