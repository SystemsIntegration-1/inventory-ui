import React from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider
} from '@mui/material';
import { InventoryMovement } from '../utils/types';

interface MovementListProps {
  movements: InventoryMovement[];
  title?: string;
}

const MovementList: React.FC<MovementListProps> = ({ movements, title }) => {
  const getMovementColor = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('outgoing')) return 'error';
    if (lowerType.includes('failed')) return 'warning';
    return 'default';
  };

  return (
    <Box>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title} ({movements.length})
        </Typography>
      )}
      
      {movements.length === 0 ? (
        <Typography color="text.secondary">No movements found</Typography>
      ) : (
        <Grid container spacing={2}>
          {movements.map((movement) => (
            <Grid item xs={12} key={movement.id}>
              <Card
                elevation={0}
                sx={{
                  border: '1px solid #eee',
                  borderRadius: 2,
                  mb: 1
                }}
              >
                <CardContent>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <Chip
                        label={movement.movementType}
                        color={getMovementColor(movement.movementType) as any}
                        size="small"
                        variant="outlined"
                      />
                    </Grid>
                    
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2">
                        <strong>Quantity:</strong> {movement.quantity}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6} sm={3}>
                      <Typography variant="body2">
                        <strong>Date:</strong> {new Date(movement.movementDate).toLocaleDateString()}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <strong>Origin:</strong> {movement.origin}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Typography variant="body2">
                        <strong>Destination:</strong> {movement.destination}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MovementList;