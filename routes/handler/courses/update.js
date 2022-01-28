const apiAdapter = require('../../apiAdapter');
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async(req, res) => {
    try {
        const id = req.params.id;
        const course = await api.put(`/api/courses/${id}`, req.body);

        return res.json(course.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 500, message: 'Service Unavailable' })
        }

        const { status, data } = error.response;

        return res.status(status).json(data);
    }
};