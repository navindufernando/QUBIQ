const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 5000;

// PostgreSQL connection
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'chat_app',
    password: 'your_password',
    port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoints

// Get all chats for a user
app.get('/api/chats/:userId', async (req: { params: { userId: any; }; }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
    try {
        const { userId } = req.params;
        const result = await pool.query(`
            SELECT c.id, c.name, c.is_group, 
                   m.text as last_message, m.sent_at as last_message_time
            FROM chats c
            JOIN chat_participants cp ON c.id = cp.chat_id
            LEFT JOIN (
                SELECT chat_id, text, sent_at,
                       ROW_NUMBER() OVER (PARTITION BY chat_id ORDER BY sent_at DESC) as rn
                FROM messages
            ) m ON c.id = m.chat_id AND m.rn = 1
            WHERE cp.user_id = $1
            ORDER BY COALESCE(m.sent_at, c.created_at) DESC
        `, [userId]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get messages for a chat
app.get('/api/chats/:chatId/messages', async (req: { params: { chatId: any; }; }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
    try {
        const { chatId } = req.params;
        const result = await pool.query(`
            SELECT m.id, m.text, m.sent_at as timestamp, 
                   u.id as sender_id, u.username as sender_name, u.avatar_url
            FROM messages m
            LEFT JOIN users u ON m.sender_id = u.id
            WHERE m.chat_id = $1
            ORDER BY m.sent_at ASC
        `, [chatId]);
        
        const messages = result.rows.map((row: { id: any; text: any; timestamp: string | number | Date; sender_id: number; sender_name: any; avatar_url: any; }) => ({
            id: row.id,
            text: row.text,
            timestamp: new Date(row.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sender: row.sender_id === 4 ? 'user' : 'ASANA', // Assuming user_id 4 is the current user
            senderName: row.sender_name,
            avatarUrl: row.avatar_url
        }));
        
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Send a message
app.post('/api/chats/:chatId/messages', async (req: { params: { chatId: any; }; body: { text: any; senderId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
    try {
        const { chatId } = req.params;
        const { text, senderId } = req.body;
        
        const result = await pool.query(
            'INSERT INTO messages (chat_id, sender_id, text) VALUES ($1, $2, $3) RETURNING *',
            [chatId, senderId, text]
        );
        
        const newMessage = result.rows[0];
        res.status(201).json(newMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Search chats
app.get('/api/chats/search', async (req: { query: { query: any; userId: any; }; }, res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
    try {
        const { query, userId } = req.query;
        const result = await pool.query(`
            SELECT c.id, c.name, c.is_group
            FROM chats c
            JOIN chat_participants cp ON c.id = cp.chat_id
            WHERE cp.user_id = $1 AND c.name ILIKE $2
            ORDER BY c.name
        `, [userId, `%${query}%`]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});