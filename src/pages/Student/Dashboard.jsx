// src/pages/student/Dashboard.jsx
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import {
  getApplications,
  getDocuments,
  getAcademicRecords
} from "../../services/studentService";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [documentsCount, setDocumentsCount] = useState(0);
  const [academicCount, setAcademicCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: userData } = await getCurrentUser();
      const userId = userData?.user?.id;

      if (!userId) return;

      const apps = await getApplications(userId);
      const docs = await getDocuments(userId);
      const academics = await getAcademicRecords(userId);

      setApplicationsCount(apps?.data?.length || 0);
      setDocumentsCount(docs?.data?.length || 0);
      setAcademicCount(academics?.data?.length || 0);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="fw-bold mb-4">Student Dashboard</h2>

      <Row>
        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-4 p-3">
            <h5 className="fw-bold">Applications</h5>
            <p className="display-6 fw-bold text-primary">{applicationsCount}</p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-4 p-3">
            <h5 className="fw-bold">Uploaded Documents</h5>
            <p className="display-6 fw-bold text-success">{documentsCount}</p>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 rounded-4 p-3">
            <h5 className="fw-bold">Academic Records</h5>
            <p className="display-6 fw-bold text-warning">{academicCount}</p>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm border-0 rounded-4 p-4">
            <h5 className="fw-bold">Recent Activity</h5>
            <p className="text-muted fst-italic mt-2">
              Nothing new for now — keep grinding, king. ✨
            </p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
