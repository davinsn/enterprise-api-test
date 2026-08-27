import oracledb from 'oracledb';
import dotenv from 'dotenv';

dotenv.config();

export async function testOracleConnection() {
    let connection;

    try {
        connection = await oracledb.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectString: process.env.ORACLE_CONNECT_STRING
        });

        const result = await connection.execute(`
            SELECT
                'Oracle connection successful' AS message,
                SYSDATE AS server_time
            FROM dual
        `);

        return {
            success: true,
            data: result.rows
        };

    } catch (error) {
        console.error('Oracle error:', error);

        return {
            success: false,
            error: error.message
        };

    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error('Error closing Oracle connection:', error);
            }
        }
    }
}