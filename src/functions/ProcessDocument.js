const { app } = require('@azure/functions');

app.http('ProcessDocument', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',

    handler: async (request, context) => {

        context.log('Processing document request');

        // Get approval information from URL
        const action = request.query.get('action');
        const fileName = request.query.get('fileName');

        // ==============================
        // APPROVE
        // ==============================
        if (action === 'approve') {

            return {
                status: 200,
                headers: {
                    'Content-Type': 'text/html'
                },
                body: `
                    <html>
                    <body>
                        <h1>Document Approved</h1>

                        <p>
                            <strong>File:</strong>
                            ${fileName || 'Unknown document'}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            APPROVED
                        </p>

                        <p>
                            The document has been successfully approved.
                        </p>

                    </body>
                    </html>
                `
            };
        }

        // ==============================
        // REJECT
        // ==============================
        if (action === 'reject') {

            return {
                status: 200,
                headers: {
                    'Content-Type': 'text/html'
                },
                body: `
                    <html>
                    <body>
                        <h1>Document Rejected</h1>

                        <p>
                            <strong>File:</strong>
                            ${fileName || 'Unknown document'}
                        </p>

                        <p>
                            <strong>Status:</strong>
                            REJECTED
                        </p>

                        <p>
                            The document has been rejected.
                        </p>

                    </body>
                    </html>
                `
            };
        }

        // ==============================
        // NORMAL DOCUMENT PROCESSING
        // ==============================

        let data = {};

        try {
            data = await request.json();
        } catch (error) {
            context.log('No JSON body received');
        }

        const documentName = data.fileName;
        const fileSize = Number(data.fileSize);

        if (!documentName) {
            return {
                status: 400,
                jsonBody: {
                    error: 'Missing fileName'
                }
            };
        }

        return {
            status: 200,
            jsonBody: {
                fileName: documentName,
                fileSize: fileSize,
                status: 'Waiting for approval',
                receivedTime: new Date().toISOString()
            }
        };
    }
});