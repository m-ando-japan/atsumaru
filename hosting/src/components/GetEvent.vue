<script>
import axios from 'axios'
export default {
  created: function () {
    axios.get('https://us-central1-atsumaru-803b0.cloudfunctions.net/event')
      .then(response => {
        console.log(response.data) // mockData
        console.log(response.status) // 200
      })
  }
}
</script>