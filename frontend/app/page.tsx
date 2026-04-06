'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { useMutation } from '@apollo/client/react';

const GET_USERS = gql`
  query {
    users {
      id
      name
      role
      country
    }
  }
`;

const CREATE_ORDER = gql`
  mutation CreateOrder($userId: String!) {
    createOrder(userId: $userId)
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery<any>(GET_USERS);
  const [createOrder] = useMutation(CREATE_ORDER);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6">Error fetching users</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Users</h1>

      {data.users.map((user: any) => (
        <div key={user.id} className="border p-3 mb-2 rounded">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Country:</strong> {user.country}</p>

          <button
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => createOrder({ variables: { userId: user.id } })}
          >
            Create Order
          </button>
        </div>
      ))}
    </div>
  );
}