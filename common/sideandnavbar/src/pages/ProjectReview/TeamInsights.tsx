import { Grid, Typography, Box, Button, Card, CardContent, Avatar, Rating, Chip } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

interface TeamInsightsProps {
  teamInsights: any[];
}

export default function TeamInsights({ teamInsights }: TeamInsightsProps) {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>Team Insights ({teamInsights.length})</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}>Filter by Role</Button>
            <Button variant="contained" sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}>Request New Insights</Button>
          </Box>
        </Box>

        {teamInsights.length > 0 ? (
          teamInsights.map((insight) => (
            <Card key={insight.id} elevation={0} sx={{ borderRadius: 3, boxShadow: "0 2px 20px rgba(0,0,0,0.05)", mb: 3, overflow: "visible" }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ bgcolor: "#6366f1", width: 40, height: 40, mr: 2 }}>{insight.member.name.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{insight.member.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{insight.member.role} • {insight.date}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", bgcolor: "rgba(99, 102, 241, 0.1)", p: 1, borderRadius: 2 }}>
                    <Rating value={insight.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" sx={{ fontWeight: 500, ml: 1 }}>{insight.rating.toFixed(1)}</Typography>
                  </Box>
                </Box>
                <Typography variant="body1" paragraph sx={{ mt: 2 }}>{insight.content}</Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Focus Areas:</Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {insight.focus_areas.map((area: string, index: number) => (
                      <Chip key={index} label={area} size="small" sx={{ borderRadius: 2, bgcolor: "rgba(99, 102, 241, 0.1)", color: "#6366f1", fontWeight: 500 }} />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="textSecondary">No team insights available yet.</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}